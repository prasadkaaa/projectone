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

                    bat '''
                    docker run --rm ^
                    -v "%cd%":/src ^
                    -w /tmp ^
                    node:20 sh -c " \
                        cp -r /src /tmp/app && \
                        cd /tmp/app && \
                        node -v && \
                        npm install && \
                        npm install -g @sap/cds-dk mbt cf-cli && \
                        mbt build && \
                        cf login -a $CF_API -u $BTP_USER -p $BTP_PASS -o $CF_ORG -s $CF_SPACE && \
                        cf deploy mta_archives/*.mtar \
                    "
                    '''
                }
            }
        }

    }
}