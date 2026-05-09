def call(String credentialsId, String imageName){

    withCredentials(
        [
            usernamePassword(
                credentialsId: "${credentialsId}",
                passwordVariable: "password",
                usernameVariable: "username",
            )
        ]
    ){
        sh "docker push ${username}/${imageName}:latest"
    }

}
