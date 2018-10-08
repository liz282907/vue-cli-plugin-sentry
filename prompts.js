const {
    chalk,
    hasGit
} = require('@vue/cli-shared-utils');
const errorFactory = (name) => chalk.red(`${name} should be required.`);
module.exports = [{
        name: 'organization',
        type: 'input',
        message: `please input your organization(eg. ${chalk.underline.blue('your-organization-name')})`,
        validate: (input) => {
            if (!input) return errorFactory('organization');
            return true;
        }
    },
    {
        name: 'project',
        type: 'input',
        message: `please input your project name(eg. ${chalk.underline.blue('your-project-name')})`,
        validate: (input) => {
            if (!input) return errorFactory('project');
            return true;
        }
    },
    {
        name: 'apiKey',
        type: 'input',
        description: 'please have a look at https://docs.sentry.io/api/auth/',
        message: 'please input your apiKey/token.',
        validate: (input) => {
            if (!input) return errorFactory('apiKey');
            return true;
        }
    },
    {
        name: 'release-mode',
        choices: [{
                name: 'manual',
                value: 'manual'
            },
            {
                name: 'auto generated via git hash' + (hasGit() ? '' : chalk.red(' (requires Git)')),
                value: 'auto'
            }
        ],
        type: 'list',
        default: 'auto',
        message: 'please choose the way to generate your release info'
    },
    {
        name: 'baseSentryURL',
        type: 'input',
        default: 'https://sentry.io/api/0',
        validate: (input) => {
            if (!input) return errorFactory('baseSentryURL');
            return true;
        },
        message: 'please input your baseSentryURL to upload sourcemap file'
    },
    {
        name: 'release',
        type: 'input',
        when: (answers) => answers['release-mode'] === 'manual',
        validate: (input) => {
            if (!input) return errorFactory('release');
            return true;
        },
        message: 'please input your baseSentryURL to upload sourcemap file'
    },
    {
        name: 'dsn',
        type: 'input',
        validate: (input) => {
            if (!input) return errorFactory('dsn');
            return true;
        },
        message: 'please provide your dsn.'
    },
];