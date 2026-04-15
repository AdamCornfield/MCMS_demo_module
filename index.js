module.exports =  ({ auth, func, db, valid}) => {
    const express = require('express')
    const { v4: uuidv4 } = require('uuid')
    const router = express.Router()
    const luxon = require('luxon')
    const path = require('path')

    let DateTime = luxon.DateTime

    const moduleName = 'demo' // Set this to the name of your module, it should not include the full tag used, for example the MCMS_events_module, will just be events

    router.get('/', (req, res) => {
        func.getUserData(req.user, (success, userData) => {
            if (!success) {
                console.error('Error fetching user data:', userData)
            } else {
                res.render('default', {
                    isAuthenticated: req.isAuthenticated(),
                    userData,
                    pagePath: `module-${moduleName}/home`,
                    pageTitle: 'Demo - MCMS'
                })
            }
        })
    })

    return {
        router,
        viewsPath: path.join(__dirname, '/views'), // Injects the custom views for this module.
        staticPath: path.join(__dirname, '/public'), // Injects the static files location for this module.
        basePath: `/${moduleName}` // This is the base path that will be used for static file serving, so a css file in this module's public folder would be found at public/demo/styles.css
    }
}