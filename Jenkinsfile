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
        stage('Build MTA (Stable Docker Build)') {
    steps {
        bat 'mkdir mta_archives || exit 0'
        
        bat '''
        docker run --rm ^
        -v %cd%:/src ^
        node:20 ^
        bash -c "apt-get update && apt-get install -y make && \
        rm -rf /app && mkdir /app && \
        cp -r /src/. /app && \
        cd /app && \
        npm ci && \
        npm install -g mbt && \
        mbt build && \
        cp -r mta_archives /src/"
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
