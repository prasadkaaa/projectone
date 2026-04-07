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
        cat /app/mta_archives/*.mtar > /src/mta_archives/app.mtar
        '''
    }
}

        stage('Deploy to BTP') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'btp-credentials', usernameVariable: 'CF_USER', passwordVariable: 'CF_PASS')]) {
                bat '''
                docker run --rm ^
                -e CF_USER=%CF_USER% ^
                -e CF_PASS=%CF_PASS% ^
                -v %cd%:/workspace ^
                -w /workspace ^
                ppiper/cf-cli ^
                sh -c "cf install-plugin multiapps -f && \
                cf login -a https://api.cf.us10-001.hana.ondemand.com -u $CF_USER -p $CF_PASS -o 6e3b2a68trial -s dev && \
                echo 'Checking MTAR files...' && \
                ls -l mta_archives && \
                MTAR_FILE=$(ls mta_archives/*.mtar) && \
                echo Deploying $MTAR_FILE && \
                cf deploy $MTAR_FILE"
                '''
                }
            }
       }
    }
}
