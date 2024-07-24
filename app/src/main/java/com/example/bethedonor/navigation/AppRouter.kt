package com.example.bethedonor.navigation

import kotlinx.serialization.Serializable
@Serializable
sealed class Destination {
    @Serializable
    data object Registration : Destination()

    @Serializable
    data object Login : Destination()

    @Serializable
    data class Home(val userId:String) : Destination()

    @Serializable
    data class AllRequest(val userId:String) : Destination()

    @Serializable
    data class CreateRequest(val userId:String) : Destination()

    @Serializable
    data class History(val userId:String) : Destination()

    @Serializable
    data class Profile(val userId:String ) : Destination()
}

