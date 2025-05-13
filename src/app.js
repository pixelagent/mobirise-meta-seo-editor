defineM("global-html-insert", function (require, mbrApp, tr) {
    mbrApp.regExtension({
        name: "global-html-insert",
        events: {
            load: function () {
                const ext = this;

                // Sidebar settings
                ext.addFilter("sidebarProjectSettings", function (items) {
                    const settings = ext.projectSettings["global-html-insert"] || {
                        head: "",
                        afterBody: "",
                        beforeBody: ""
                    };

                    items.push({
                        name: "global-html-insert-settings",
                        title: "Global HTML Insert",
                        html: `
                            <div class="form-group">
                                <label>Before &lt;/head&gt;:</label>
                                <textarea class="form-control" rows="4" name="ghi-head" placeholder="Paste the HTML code you want to have on every page right before </head> tag.">${settings.head || ""}</textarea>
                            </div>
                            <div class="form-group">
                                <label>After &lt;body&gt;:</label>
                                <textarea class="form-control" rows="4" name="ghi-after-body" placeholder="Paste the HTML code you want to have right after the opening <body> tag.">${settings.afterBody || ""}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Before &lt;/body&gt;:</label>
                                <textarea class="form-control" rows="4" name="ghi-before-body" placeholder="Paste the HTML code you want to have right before the closing </body> tag.">${settings.beforeBody || ""}</textarea>
                            </div>
                        `
                    });

                    return items;
                });

                // Save settings on input
                mbrApp.$body.on("input", "textarea[name^='ghi-']", function () {
                    const ps = ext.projectSettings["global-html-insert"] || {};
                    ps.head = $("textarea[name='ghi-head']").val();
                    ps.afterBody = $("textarea[name='ghi-after-body']").val();
                    ps.beforeBody = $("textarea[name='ghi-before-body']").val();
                    ext.projectSettings["global-html-insert"] = ps;
                });

                // Inject HTML during publish
                ext.addFilter("publishHTML", function (html) {
                    const settings = ext.projectSettings["global-html-insert"];
                    if (!settings) return html;

                    if (settings.head) {
                        html = html.replace(/<\/head>/i, settings.head + "\n</head>");
                    }
                    if (settings.afterBody) {
                        html = html.replace(/<body[^>]*>/i, match => match + "\n" + settings.afterBody);
                    }
                    if (settings.beforeBody) {
                        html = html.replace(/<\/body>/i, settings.beforeBody + "\n</body>");
                    }

                    return html;
                });
            }
        }
    });
}, ["jQuery", "mbrApp", "TR()"]);
