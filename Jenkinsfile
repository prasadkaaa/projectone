pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    environment {
        CF_API = "https://api.cf.us10-001.hana.ondemand.com"
        CF_ORG = "6e3b2a68trial"
        CF_SPACE = "dev"
       
    }

    stages {

        stage('Verify Node') {
            steps {
                sh '''
                node -v
                npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                npm install
                npm install -g @sap/cds-dk mbt cf-cli
                '''
            }
        }

        stage('Build MTA') {
            steps {
                sh 'mbt build'
            }
        }

        stage('Deploy to CF') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'btp-credentials',
                    usernameVariable: 'BTP_USER',
                    passwordVariable: 'BTP_PASS'
                )]) {
                    sh '''
					cf login -a $CF_API -u $BTP_USER -p $BTP_PASS -o $CF_ORG -s $CF_SPACE
					cf deploy mta_archives/*.mtar
					'''
                }
            }
        }
    }
}