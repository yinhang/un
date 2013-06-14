un.define(
    "un.client.ui.widget.PopMenu",
    [
        "un.client.Class",
        "un.client.ui.widget.Container",
        "un.client.ui.widget.popmenu.Item"
    ],
    function (Class, Container, Item) {
        
        var PopMenu = Class.define(
            /**
             * 
             * @param {Object} menuData
             *  [
             *      {
             *          text: "item1",
             *          click: function (text) {
             *              alert(text + " click.");
             *          };
             *      }
             * ]
             * @param {Object} options.fontSize
             * 
             */
            function (menuData, options) {
                var self = this;
                var offsetY = 0;
                var maxItemWidth = 0;
                var itemList = [];
                this.contextData = null;
                for(var i = 0, l = menuData.length; i < l; ++ i)
                {
                    var itemData = menuData[i];
                    var itemWidth = itemData.text.length * options.fontSize;
                    var item = new Item(itemData.text, itemWidth, options.fontSize);
                    item.setY(offsetY);
                    item.setX(0);
                    offsetY += item.getHeight();
                    itemList.push(item);
                    var itemWidth = item.getWidth();
                    if(itemWidth > maxItemWidth)
                        maxItemWidth = itemWidth;
                    if(itemData.hasOwnProperty("click"))
                    {
                        item.listen("click", (function (_item, _itemData) {
                            return function () {
                                _itemData.click(_item, self.contextData);
                            };
                        })(item, itemData));
                    }
                }
                //不调用父类构造器，无法add。。。
                //计算bottom尺寸
                var lastItem = itemList[itemList.length - 1];
                this._super(maxItemWidth, lastItem.getY() + lastItem.getHeight());
                for(var i = 0, l = itemList.length; i < l; ++ i)
                {
                    itemList[i].setWidth(maxItemWidth);
                    this.add(itemList[i]);
                }
                this.hide();
            },
            {
                show: function (x, y, contextData) {
                    this.contextData = contextData || null;
                    this.setX(x);
                    this.setY(y);
                    this._super.show();
                    this.repaint();
                },
                hide: function () {
                    this._super.hide();
                    this.repaint();
                },
                paint: function () {
                    var painter = this.getPainter();
                    var ctx = painter.getContext();
                    ctx.fillStyle = "#ffffff";
                    painter.fillRect(0, 0, this.getWidth(), this.getHeight());
                    ctx.fillStyle = "rgb(142, 142, 142)";
                    painter.drawRect(0, 0, this.getWidth(), this.getHeight());
                }
            },
            Container
        );
        
        return PopMenu;
    }
);
