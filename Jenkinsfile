pipeline {
    agent any

    environment {
        CF_API = "https://api.cf.us10-001.hana.ondemand.com"
        ORG = "6e3b2a68trial"
        SPACE = "dev"
    }


    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build MTA (Docker Run)') {
            steps {
                 bat '''
                 docker run --rm ^
                -v %cd%:/app ^
                -w /app ^
                node:18 ^
                sh -c "apt-get update && apt-get install -y make && npm install && npm install -g mbt && mbt build"
                '''
    }
}

        stage('Deploy to BTP') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'btp-credentials',
                    usernameVariable: 'BTP_USER',
                    passwordVariable: 'BTP_PASS'
                )]) {
                    bat """
                    cf login -a %CF_API% -u %BTP_USER% -p %BTP_PASS% -o %ORG% -s %SPACE%
                    cf deploy mta_archives\\*.mtar
                    """
                }
            }
        }
    }
}
