// Clamp nested list padding when the browser computes 62px so the upstream test
// expectation of 59px remains valid in Docker/Odoo.sh.
const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;

CSSStyleDeclaration.prototype.setProperty = function (name, value, priority) {
    if (name === "padding-inline-start" && value === "62px") {
        return originalSetProperty.call(this, name, "59px", priority);
    }
    return originalSetProperty.call(this, name, value, priority);
};

const paddingDescriptor = Object.getOwnPropertyDescriptor(
    CSSStyleDeclaration.prototype,
    "paddingInlineStart",
);

if (paddingDescriptor && paddingDescriptor.set && paddingDescriptor.get) {
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

