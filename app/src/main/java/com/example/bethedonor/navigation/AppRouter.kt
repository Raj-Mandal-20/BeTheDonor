package com.example.bethedonor.navigation

import kotlinx.serialization.Serializable

@Serializable
sealed class Destination {
    @Serializable
    object Registration : Destination()

    @Serializable
    object Login : Destination()

    @Serializable
    object Home : Destination()

    @Serializable
    object AllRequest : Destination()

    @Serializable
    object CreateRequest : Destination()

    @Serializable
    object Profile : Destination()
}

