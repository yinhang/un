un.define(
    "un.client.ui.widget.view.Container",
    [
        "un.client.Class",
        "un.client.ui.widget.Container"
    ],
    function (Class, WidgetContainer) {
        
        var Container = Class.define(
            function (width, height) {
                var self = this;
                this._super(width, height);
                self.autoAdaptContent(true);
            },
            {
                adaptContent: function () {
                    this._super.adaptContent();
                    var parent = this.getParent();
                    if(parent)
                    {
                        var parentWidth = parent.getWidth();
                        var parentHeight = parent.getHeight();
                        if(parentWidth > this.getWidth())
                        {
                            this.setWidth(parentWidth);
                        }
                        if(parentHeight > this.getHeight())
                        {
                            this.setHeight(parentHeight);
                        }
                    }
                }
            },
            WidgetContainer
        );
        
        return Container;
    }
);
