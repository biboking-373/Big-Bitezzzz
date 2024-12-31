import DOMPurify from 'dompurify'

export default {
    install(app) {
        // Global method to sanitize inputs
        app.config.globalProperties.$sanitize = (dirty) => {
            return DOMPurify.sanitize(dirty)
        }
    }
}