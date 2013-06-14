//
(function () {
    var REG_EXP = {
        FIND_DOT: /\./g
    };
    
    var loadingCount = 0;
    var loadingNow = 0;
    function loading() {
        ++ loadingCount;
    };
    
    function loadComplete() {
        ++ loadingNow;
    };
    
    function throwError(msg) {
        throw new Error("un: " + msg);
    };
    
    function isArray(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    };
    
    function define() {
        var packName = arguments[0];
        if(typeof packName == "string")
        {
            //同时拥有依赖和回调
            var dependList = arguments[1];
            //以下可用dependList访问依赖列表，为数组。
            if(isArray(dependList) && dependList.length > 0)
            {
                var dependLen = dependList.length;
                var loadCount = 0;
                var dependLoaded = [];
                var dependNameIndex = {};
                var parentArgs = arguments;
                function loadDependCallback(dependPackName, data) {
                    dependLoaded[dependNameIndex[dependPackName]] = data;
                    if(++ loadCount >= dependLen)
                    {
                        if(typeof parentArgs[2] == "function")
                        {
                            PACK_MAP[packName] = {
                                data: parentArgs[2].apply(window, dependLoaded) 
                            };
                            //通知所有等待者
                            var waitQueue = WAITS[packName];
                            if(waitQueue == undefined)
                            {
                                throwError("un.define的依赖查询字段必须和物理文件路径对应。但此依赖查询字段无法对应物理文件：\"" + packName + "\"。");
                            }
                            var data = PACK_MAP[packName].data;
                            for(var i = 0, l = waitQueue.length; i < l; ++ i)
                            {
                                if(waitQueue[i] == loadDependCallback)
                                    continue;
                                waitQueue[i](packName, data);
                            }
                            delete WAITS[packName];
                        }
                    }
                };
                for(var i = 0;i < dependLen; ++ i)
                {
                    var dependName = dependList[i].trim();
                    dependNameIndex[dependName] = i;
                    //检测是或否为loaderquerystr
                    var loaderQueryStr = dependName.split(":");
                    if(loaderQueryStr.length > 1)
                    {
                        loaderQueryStr = [loaderQueryStr[0].trim(), loaderQueryStr.splice(1).join(":").trim()];
                        (function (_loaderQueryStr, _dependName) {
                            use(_loaderQueryStr[0], "un.client.Loader", function (_loader, _superLoader) {
                                if(_loader.is && _loader.is(_superLoader))
                                {
                                     _loader.load([_loaderQueryStr[1]], function (event) {
                                         if(event.progress == 100)
                                         {
                                             loadDependCallback(_dependName, event.lastLoaded);
                                         }
                                     });
                                }
                                else
                                {
                                    throwError("un.define在定义\"" + packName + "\"包的时候，此依赖：\"" + _dependName + "\"中的\"" + _loaderQueryStr[0] + "\"不是Loader。");
                                }
                            });
                        })(loaderQueryStr, dependName);
                        continue;
                    }
                    //加入等待队列
                    waitPack(dependName, loadDependCallback);
                }
            }
            //只有回调
            else if(typeof arguments[1] == "function")
            {
                PACK_MAP[packName] = {
                    data: arguments[1].apply(window)
                };
                //通知所有等待者
                var waitQueue = WAITS[packName];
                if(waitQueue)
                {
                    var data = PACK_MAP[packName].data;
                    for(var i = 0, l = waitQueue.length; i < l; ++ i)
                    {
                        waitQueue[i](packName, data);
                    }
                    delete WAITS[packName];
                }
                else
                {
                    throwError("un.define的依赖查询字段必须和物理文件路径对应。但此依赖查询字段无法对应物理文件：\"" + packName + "\"。");
                }
            }
            //同时拥有依赖和回调，但依赖为空串or空数组。
            else if(typeof arguments[2] == "function" && ( isArray(dependList) && dependList.length == 0 ))
            {
                PACK_MAP[packName] = {
                    data: arguments[2].apply(window)
                };
                //通知所有等待者
                var waitQueue = WAITS[packName];
                if(waitQueue)
                {
                    var data = PACK_MAP[packName].data;
                    for(var i = 0, l = waitQueue.length; i < l; ++ i)
                    {
                        waitQueue[i](packName, data);
                    }
                    delete WAITS[packName];
                }
                else
                {
                    throwError("un.define的依赖查询字段必须和物理文件路径对应。但此依赖查询字段无法对应物理文件：\"" + packName + "\"。");
                }
            }
            else
            {
                throwError("un.define在定义包: \"" + packName + "\"的时候，必须有第二个参数：依赖或者构造回调。");
            }
        }
        else
        {
            throwError("un.define方法调用没有传递要定义的包名。");
        }
    };
    
    var WAITS = {};
    
    function waitPack(packName, complete) {
        loading();
        var _complete = complete;
        complete = function () {
            if(_complete)
                _complete.apply(window, arguments);  
            loadComplete();
        };
        if(PACK_MAP.hasOwnProperty(packName))
        {
            complete(packName, PACK_MAP[packName].data);
            return;
        }
        if(WAITS[packName] == undefined)
        {
            WAITS[packName] = [];
            WAITS[packName].push(complete);
            loadPack(packName);
            return;
        }
        WAITS[packName].push(complete);
    };
    
    function loadPack(packName) {
        var scriptDOM = document.createElement("script");
        if(!document.head)
        {
            document.documentElement.appendChild(document.createElement("head"));
        }
        scriptDOM.type = "text/javascript";
        scriptDOM.className = "js-un-pack";
        scriptDOM.onload = function () {
            document.head.removeChild(scriptDOM);
        };
        scriptDOM.onerror = function (e) {
            throwError("无法加载此包: \"" + packName + "\"。");
        };
        scriptDOM.src = baseURI + packName.replace(REG_EXP.FIND_DOT, "/") + ".js";
        //scriptDOM.src = baseURI + packName.replace(REG_EXP.FIND_DOT, "/") + ".js?tt=" + new Date().getTime();
        document.head.appendChild(scriptDOM);
    };
    
    var PACK_MAP = {};
    
    function use() {
        var loadCount = 0;
        var packNameIndex = [];
        var loaded = [];
        var complete = null;
        var requireCount = arguments.length;
        for(var i = arguments.length - 1; i >= 0; -- i)
        {
            if(typeof arguments[i] == "function")
            {
                complete = arguments[i];
                -- requireCount;
                continue;
            }
            var packName = arguments[i].trim();
            packNameIndex[packName] = i;
            //检测是或否为loaderquerystr
            var loaderQueryStr = packName.split(":");
            if(loaderQueryStr.length > 1)
            {
                loaderQueryStr = [loaderQueryStr[0].trim(), loaderQueryStr.splice(1).join(":").trim()];
                (function (_loaderQueryStr, _packName) {
                    use(_loaderQueryStr[0], "un.Loader", function (_loader, _superLoader) {
                        if(_loader.is && _loader.is(_superLoader))
                        {
                             _loader.load([_loaderQueryStr[1]], function (event) {
                                 if(event.progress == 100)
                                 {
                                    loaded[packNameIndex[_packName]] = event.lastLoaded;
                                    ++ loadCount;
                                    if(complete != null && loadCount >= requireCount)
                                    {
                                        complete.apply(window, loaded);
                                    }
                                 }
                             });
                        }
                        else
                        {
                            throwError("un.use在请求使用\"" + _packName + "\"的时候，\"" + _loaderQueryStr[0] + "\"不是Loader。");
                        }
                    });
                })(loaderQueryStr, packName);
                continue;
            }
            //fetch from cache.
            if(PACK_MAP.hasOwnProperty(packName))
            {
                loaded[i] = PACK_MAP[packName].data;
                ++ loadCount;
                if(complete != null && loadCount >= requireCount)
                {
                   complete.apply(window, loaded);
                   return;
                }
            }
            else
            {
                waitPack(packName, function (packName, data) {
                    //寻找索引，保存参数。
                    loaded[packNameIndex[packName]] = data;
                    ++ loadCount;
                    if(complete != null && loadCount >= requireCount)
                    {
                        complete.apply(window, loaded);
                    }
                });
            }
        }
    };
    
    var baseURI = "/";
    var eventHandle = {
        disable_contextmenu: function (event) {
            event.preventDefault();
        },
        disable_touchscroll: function (event) {
            event.preventDefault();
        }
    };
    var un = {
        setBaseURI: function (_baseURI) {
            baseURI = _baseURI;
        },
        getBaseURI: function () {
            return baseURI;
        },
        getLoadingProgress: function () {
            return Math.floor(loadingNow / loadingCount * 100);
        },
        packDataInfo: function (data) {
            for(var name in PACK_MAP)
            {
                var pack = PACK_MAP[name];
                if(pack.data === data)
                {
                    return {
                        name: name,
                        error: null
                    };
                }
            }
            return {
                error: "不是un.define返回的对象"
            }
        },
        throwError: throwError,
        define: define,
        use: use,
        tool: {
            disableContextMenu: function () {
                window.addEventListener("contextmenu", eventHandle["disable_contextmenu"]);
            },
            disableTouchScroll: function () {
                window.addEventListener("touchstart", eventHandle["disable_touchscroll"]);
            }
        }
    };
    
    //尝试自动生成baseURI
    var scriptTags = document.querySelectorAll("script");
    var packLoaderURI = "un/client/un.js";
    for(var i = 0, l = scriptTags.length; i < l; ++ i)
    {
        var scriptSrc = scriptTags[i].src;
        var srcStartIndex = scriptSrc.indexOf(packLoaderURI);
        if(srcStartIndex != -1)
        {
            un.setBaseURI(scriptSrc.substr(0, srcStartIndex));
            break;
        }
    }
    
    window.un = un;
})();
