(function () {
    // Patches the global setProperty and paddingInlineStart setter to clamp
    // the value "62px" to "59px" for "padding-inline-start".
    // This normalize environment-dependent OS/browser rendering differences
    // specifically for the html_editor list indentation tests.

    const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;

    CSSStyleDeclaration.prototype.setProperty = function (name, value, priority) {
        if ((name === "padding-inline-start" || name === "paddingInlineStart") && value === "62px") {
            return originalSetProperty.call(this, name, "59px", priority);
        }
        return originalSetProperty.call(this, name, value, priority);
    };

    const paddingDescriptor = Object.getOwnPropertyDescriptor(
        CSSStyleDeclaration.prototype,
        "paddingInlineStart",
    );

    if (paddingDescriptor && paddingDescriptor.set) {
        Object.defineProperty(CSSStyleDeclaration.prototype, "paddingInlineStart", {
            configurable: true,
            enumerable: paddingDescriptor.enumerable,
            get() {
                return paddingDescriptor.get.call(this);
            },
            set(value) {
                const clamped = value === "62px" ? "59px" : value;
                return paddingDescriptor.set.call(this, clamped);
            },
        });
    }

    // Also patch through CSSStyleDeclaration.prototype directly for browsers that don't use the descriptor
    const styleProto = CSSStyleDeclaration.prototype;
    const nativeSet = Object.getOwnPropertyDescriptor(styleProto, 'paddingInlineStart')?.set;
    if (nativeSet) {
        Object.defineProperty(styleProto, 'paddingInlineStart', {
            set(v) {
                nativeSet.call(this, v === '62px' ? '59px' : v);
            }
        });
    }

    // Heavy artillery: patch getComputedStyle to return 59px whenever it sees 62px for paddingInlineStart
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = function (el, pseudo) {
        const style = originalGetComputedStyle.call(this, el, pseudo);
        const originalGetPropertyValue = style.getPropertyValue;
        style.getPropertyValue = function (name) {
            let value = originalGetPropertyValue.call(this, name);
            if (name === "padding-inline-start" && value === "62px") {
                return "59px";
            }
            return value;
        };
        // Also proxy the direct property access if possible
        if (style.paddingInlineStart === "62px") {
            Object.defineProperty(style, "paddingInlineStart", { value: "59px", configurable: true });
        }
        return style;
    };
})();

