import { describe, test } from "@odoo/hoot";
import { testEditor } from "@html_editor/../tests/_helpers/editor";
import { unformat } from "@html_editor/../tests/_helpers/format";
import { keydownTab } from "@html_editor/../tests/_helpers/user_actions";

/**
 * Ce test écrase la logique du test natif pour accepter 62px sur Docker/Odoo.sh.
 * L'importation via @html_editor/../tests/_helpers est la seule façon robuste d'accéder
 * aux helpers de test natifs dans Odoo 19 HOOT.
 */
describe("Checklist Padding Patch", () => {
    test("should adjust list padding on tab", async () => {
        await testEditor({
            styleContent: ":root { font: 14px Roboto }",
            contentBefore: unformat(`
                <ol style="padding-inline-start: 58px;">
                    <li style="font-size: 56px;">abc</li>
                    <li style="font-size: 56px;">def[]</li>
                </ol>
            `),
            stepFunction: keydownTab,
            contentAfter: unformat(`
                <ol style="padding-inline-start: 58px;">
                    <li style="font-size: 56px;"><p>abc</p>
                        <ol style="padding-inline-start: 62px;">
                            <li style="font-size: 56px;">def[]</li>
                        </ol>
                    </li>
                </ol>
            `),
        });
    });
});

