def call(String credentialsId){

    withCredentials(
        [
            usernamePassword(
                credentialsId: "${credentialsId}",
                passwordVariable: "password",
                usernameVariable: "username",
            )
        ]
    ){
        sh "docker login -u ${username} -p ${password}"
    }

}
