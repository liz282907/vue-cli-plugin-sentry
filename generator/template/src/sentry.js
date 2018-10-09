import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

if (['online','production'].indexOf(process.env.NODE_ENV)>=0) {
    const ravenOptions = {
        release: process.env.__GIT_SHA__,
        environment: process.env.NODE_ENV,
        fetchParameters: {
            credentials: 'include'
        }
    };

    <% if (options.dsn ) { %>
        const dsn = '<%-options.dsn%>';
        Raven.config(dsn, ravenOptions)
            .addPlugin(RavenVue, Vue)
            .install();
    <% } %>
}

