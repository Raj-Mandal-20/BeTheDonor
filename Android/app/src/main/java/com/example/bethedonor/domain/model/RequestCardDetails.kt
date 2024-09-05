package com.example.bethedonor.domain.model

data class RequestCardDetails(
    val name: String,
    val emailId: String,
    val phoneNo: String,
    val address: String,
    val exactPlace:String,
    val bloodUnit: String,
    val bloodGroup: String,
    val noOfAcceptors: Int,
    val dueDate: String,
    val postDate: String,
    val isOpen:Boolean,
    val isAcceptor:Boolean,
    val isMyCreation:Boolean
)