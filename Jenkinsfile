pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'jenkinsDeploy', url: 'https://github.com/prasadkaaa/projectone.git'
            }
        }

        stage('Run Node Server') {
            steps {
                // Stop any previous node server
                bat 'taskkill /F /IM node.exe || echo No node process running'
                
                // Start server in background
                bat 'start /B node server.js'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful! Open browser: http://localhost:3000'
        }
    }
}