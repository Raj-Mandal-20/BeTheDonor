package com.example.bethedonor.data.dataModels

import java.util.Date

// Base class without email
open class UserBase(
    val name: String,
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

// User class with email
data class User(
    val email: String,
    val base: UserBase
)

// User class without email
data class UserUpdate(
    val phoneNumber: String,
    val gender: String,
    val state: String,
    val city: String,
    val district: String,
    val pin: String,
    val available: Boolean
)

