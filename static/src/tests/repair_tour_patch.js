/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { registry } from "@web/core/registry";

const repairTour = registry.category("web_tour.tours").get("test_repair_without_product_in_parts");

if (repairTour) {
    const originalSteps = repairTour.steps;
    repairTour.steps = () => {
        const steps = originalSteps();
        const partnerStepIndex = steps.findIndex(s => s.trigger === ".ui-menu-item > a:contains('A Partner')");
        if (partnerStepIndex !== -1) {
            // Replace with a more generic selector that also matches if already formatted or different structure
            // Or just use the input and press enter if we can't find the menu item easily
            steps[partnerStepIndex].trigger = ".ui-menu-item:has(a:contains('A Partner')), .ui-menu-item a:contains('A Partner')";
        }
        return steps;
    };
}
