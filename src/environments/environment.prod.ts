const endpoint = 'https://midasdev.midasmoon.com/api';

export const environment = {
    production: true,
    hmr: false,
    api: {
        endpoint,
        socketServer: 'https://midasdev.midasmoon.com/api',
    },
    elasticAPM: {
        serviceName: 'midasmoon-frontend',
        serverUrl: 'https://apm.aks.diginex.app',
        distributedTracingOrigins: [endpoint],
        transactionName: 'Transaction-Name',
        sensitiveParamNames: ['password', 'currentPassword', 'newPassword', 'confirmPassword'],
    },
    enableLogging: false,
    findOutMoreUrl: 'https://iris.iom.int/',
    enableIomTermsAndConditions: false,
};
