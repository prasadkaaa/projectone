pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    environment {
        CF_API = 'https://api.cf.<region>.hana.ondemand.com'
        CF_ORG = 'your-org'
        CF_SPACE = 'your-space'
        CF_USER = credentials('cf-user')       // Jenkins credential
        CF_PASSWORD = credentials('cf-password')
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
                sh '''
                cf login -a $CF_API -u $CF_USER -p $CF_PASSWORD -o $CF_ORG -s $CF_SPACE
                cf deploy mta_archives/*.mtar
                '''
            }
        }
    }
}