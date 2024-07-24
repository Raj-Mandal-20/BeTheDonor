package com.example.bethedonor.ui.utils.operations

import java.text.SimpleDateFormat
import java.util.Date

fun formatDate(date: Date?): String {
    val dateFormat = SimpleDateFormat("yyyy-MM-dd")
    return date?.let { dateFormat.format(it) } ?: ""
}