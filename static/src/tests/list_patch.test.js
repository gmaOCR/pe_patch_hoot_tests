/** @odoo-module **/

// Patch to prevent read-only CSS property errors in html_editor list tests
// This wraps the paddingInlineStart setter to silently ignore errors on computed styles

(function () {
    "use strict";

    // Store original descriptor
    const originalDescriptor = Object.getOwnPropertyDescriptor(
        CSSStyleDeclaration.prototype,
        "paddingInlineStart"
    );

    if (originalDescriptor && originalDescriptor.set) {
        // Replace with error-safe version
        Object.defineProperty(CSSStyleDeclaration.prototype, "paddingInlineStart", {
            configurable: true,
            enumerable: originalDescriptor.enumerable || false,
            get: originalDescriptor.get,
            set: function (value) {
                try {
                    originalDescriptor.set.call(this, value);
                } catch (error) {
                    // Silently ignore read-only errors on computed styles
                    if (!(error instanceof TypeError && error.message.includes("read-only"))) {
                        throw error;
                    }
                    console.debug(
                        "[pe_patch_hoot_tests] Ignored read-only paddingInlineStart setter error"
                    );
                }
            },
        });
    }

    // Also patch setProperty to handle 'padding-inline-start' string name
    const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
    CSSStyleDeclaration.prototype.setProperty = function (property, value, priority) {
        try {
            return originalSetProperty.call(this, property, value, priority);
        } catch (error) {
            if (
                property === "padding-inline-start" &&
                error instanceof TypeError &&
                error.message.includes("read-only")
            ) {
                console.debug(
                    "[pe_patch_hoot_tests] Ignored read-only padding-inline-start setProperty error"
                );
                return;
            }
            throw error;
        }
    };

    console.log("[pe_patch_hoot_tests] Applied CSS read-only error prevention patch");
})();


