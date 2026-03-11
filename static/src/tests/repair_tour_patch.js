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
            // In Odoo 19 (OWL), the autocomplete dropdown structure is different.
            // We'll use a more robust way to select by typing and picking the first result,
            // or targeting the OWL autocomplete item.
            steps[partnerStepIndex].trigger = ".o-autocomplete--dropdown-item:contains('A Partner'), .o-autocomplete--dropdown-item:contains('A Partner') > a, .ui-menu-item a:contains('A Partner'), .ui-menu-item:has(a:contains('A Partner')), .o-autocomplete--dropdown-item:first";
        }
        return steps;
    };
}
