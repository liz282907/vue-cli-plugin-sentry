import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

if ('production' === process.env.NODE_ENV) {
    const ravenOptions = {
        release: process.env.__GIT_SHA__,
        environment: process.env.NODE_ENV
    };

<% if (options.dsn ) { %>
    const dsn = '<%-options.dsn%>';
    Raven.config(dsn, ravenOptions)
        .addPlugin(RavenVue, Vue)
        .install();
<% } %>
}

