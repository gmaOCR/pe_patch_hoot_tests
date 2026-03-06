{
    'name': 'Patch: HOOT Test Normalization',
    'version': '19.0.1.0.0',
    'category': 'Hidden/Tests',
    'summary': 'Patches specific JS tests that are failing due to environment-dependent OS rendering differences (padding-inline-start)',
    'author': 'Gregory Mariani',
    'website': '',
    'license': 'LGPL-3',
    'depends': ['html_editor'],
    'assets': {
        'web.qunit_suite_tests': [
            'pe_patch_hoot_tests/static/src/tests/list_patch.test.js',
        ],
        'web.qunit_suite_tests_mobile': [
            'pe_patch_hoot_tests/static/src/tests/list_patch.test.js',
        ],
    },
    'installable': True,
    'auto_install': True,
}
