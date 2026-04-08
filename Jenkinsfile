pipeline {
    agent any

    environment {
        CF_API = "https://api.cf.us10-001.hana.ondemand.com"
        CF_ORG = "6e3b2a68trial"
        CF_SPACE = "dev"
       
    }

     stages {

        stage('Build + Deploy in Docker') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'btp-credentials',
                    usernameVariable: 'BTP_USER',
                    passwordVariable: 'BTP_PASS'
                )]) {

                   bat """
docker run --rm ^
-v "%cd%":/src ^
-w /src ^
node:20 sh deploy.sh
"""
                }
            }
        }

    }
}