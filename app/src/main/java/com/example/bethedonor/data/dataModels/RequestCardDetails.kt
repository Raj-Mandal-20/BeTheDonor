package com.example.bethedonor.data.dataModels

data class RequestCardDetails(
    val name: String,
    val emailId: String,
    val phoneNo: String,
    val address: String,
    val exactPlace:String="",
    val bloodUnit: Int,
    val bloodGroup: String = "any",
    val noOfAcceptors: Int,
    val dueDate: String,
    val postDate: String,
    val isOpen:Boolean,
    val isAcceptor:Boolean=false
)