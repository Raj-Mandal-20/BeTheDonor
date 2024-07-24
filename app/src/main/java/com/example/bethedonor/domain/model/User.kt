package com.example.bethedonor.domain.model

import java.util.Date

data class User(
    val name: String,
    val email: String,
    val phoneNumber: String,
    val dob: Date,
    val gender: String,
    val bloodGroup: String,
    val state: String,
    val city: String,
    val district: String,
    val pin: String,
    val password: String,
    val available: Boolean
)
