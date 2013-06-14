un.define(
	"un.editor.map_editor.EditorView",
	[
	   "un.client.Class",
	   "un.client.Screen",
	   "un.client.ui.widget.button.Default",
	   "un.client.ui.widget.Frame",
	   "un.editor.map_editor.editorview.BottomPanel",
	   "un.editor.map_editor.editorview.MapEditor"
	],
	function (Class, Screen, Button, Frame, BottomPanel, MapEditor) {
	    var EditorView = Class.define(
	        function (parent, width, height) {
	            var self = this;
	            this._super(parent, width, height);
	            this.painter = this.getPainter();
	            //初始化ui框架
	            this.uiFrame = Frame.getFrame(this);
                this.mapEditor = new MapEditor(this, this.getWidth(), this.getHeight());
	            this.bottomPanel = new BottomPanel(this);
	            this.bottomPanelActBtnName;
	            this.bottomPanel.listen("buttondown", function (data) {
	                self.bottomPanelActBtnName = data.text;
	            });
                this.bottomPanel.listen("buttonup", function (data) {
                    self.bottomPanelActBtnName = null;
                });
                this.mapEditor.listen("update_row_num", function (num) {
                    self.bottomPanel.setInfoTileRow(num);
                });
                this.mapEditor.listen("update_col_num", function (num) {
                    self.bottomPanel.setInfoTileCol(num);
                });
                this.mapEditor.listen("update_mapwidth", function (num) {
                    self.bottomPanel.setInfoMapWidth(num);
                });
                this.mapEditor.listen("update_mapheight", function (num) {
                    self.bottomPanel.setInfoMapHeight(num);
                });
                this.mapEditor.listen("update_mapx", function (mapX) {
                    self.bottomPanel.setInfoMapX(mapX);
                });
                this.mapEditor.listen("update_mapy", function (mapY) {
                    self.bottomPanel.setInfoMapY(mapY);
                });
	        },
	        {
	            getMapData: function () {
	                return this.mapEditor.getAllFrame();
	            },
	            getFrame: function () {
	                return this.uiFrame;  
	            },
	            setMap: function (xIndex, yIndex, sprite) {
	                
	            },
	            gettileViewer: function () {
	                return this.tileViewer;
	            },
	            linkTileViewer: function (tileViewer) {
	                this.mapEditor.linkTileViewer(tileViewer);
	            },
	            draw: function () {
                    switch(this.bottomPanelActBtnName)
                    {
                        case "上移":
                           this.mapEditor.scrollUp();
                           break;
                        case "下移":
                           this.mapEditor.scrollDown();
                           break;
                        case "左移":
                           this.mapEditor.scrollLeft();
                           break;
                        case "右移":
                           this.mapEditor.scrollRight();
                           break;
                    }
	                this.mapEditor.draw();
	                this.uiFrame.draw();
	            }
	        },
	        Screen
	    );
	    return EditorView;
	}
);