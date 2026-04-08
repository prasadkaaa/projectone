pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'jenkinsDeploy', url: 'https://github.com/prasadkaaa/projectone.git'
            }
        }

        stage('Run Node Server1') {
    steps {
        // Stop old Node server safely, but ignore errors
        bat """
        @echo off
        tasklist /FI "IMAGENAME eq node.exe" | find /I "node.exe" >nul
        if %ERRORLEVEL%==0 (
            taskkill /F /IM node.exe
        ) else (
            echo No node process running
        )
        exit /b 0
        """

        // Start Node server in background
        bat 'start /B node server.js'
    }
}
    }

    post {
        success {
            echo 'Deployment Successful! Open browser:http://localhost:3000'
        }
    }
}