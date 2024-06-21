/* eslint-disable no-useless-return */
const NotificationHelper = {
    sendNotification({ title, options }) {
        // cek apakah browser mendukung notifikasi
        if (!this._checkAvailability()) {
            console.log('Notification not supported in this browser');
            return;
        }
        // cek apakah fitur notifikasi diizinkan. jika belum, lakukan permohonan perizinan
        if (!this._checkPermission()) {
            console.log('User did not yet granted permission');
            this._requestPermission();
            return;
        }

        // menampilkan notifikasi
        this._showNotifications({ title, options });
    },

    _checkAvailability() {
        return 'Notification' in window;
    },

    _checkPermission() {
        return Notification.permission === 'granted';
    },

    async _requestPermission() {
        const status = await Notification.requestPermission();

        if (status === 'denied') {
            console.log('Notification Denied');
        }

        if (status === 'default') {
            console.log('Permission Closed');
        }
    },

    async _showNotifications({ title, options }) {
        const serviceWorkerRegistration = await navigator.serviceWorker.ready();
        serviceWorkerRegistration.showNotifications(title, options);
    },
};

export default NotificationHelper;
