package com.example.bethedonor.utils

import java.text.ParseException
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit
import java.util.Date
import java.util.Locale

fun String.toDate(format: String = "dd/MM/yyyy"): Date? {
    return try {
        SimpleDateFormat(format, Locale.getDefault()).parse(this)
    } catch (e: ParseException) {
        e.printStackTrace()
        null
    }
}

fun formatDate(date: Date?): String {
    val dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    return date?.let {
        // Convert Date to LocalDate
        val localDate = it.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
        // Format LocalDate to String
        localDate.format(dateFormat)
    } ?: ""
}

fun dateDiffInDays(date: Date): Long {
    // Convert Date to LocalDate
    val inputDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()

    // Get the current date
    val currentDate = LocalDate.now()

    // Calculate the difference in days
    return ChronoUnit.DAYS.between(inputDate, currentDate)
}
 fun isDeadlinePassed(date: Date): Boolean {
     val deadline = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()

     // Get the current date
     val currentDate = LocalDate.now()

     // Return true if the current date is after the deadline
     return currentDate.isAfter(deadline)
 }

fun getInitials(name: String): String {
    val nameParts = name.trim().split(" ")
    return when (nameParts.size) {
        1 -> nameParts[0].take(1).uppercase() // If there's only one name part, take the first letter
        else -> nameParts.joinToString("") {
            it.take(1).uppercase()
        }  // For multiple parts, take the first letter of each
    }
}

fun getCountryCode(phNo:String):String{
    return phNo.substring(0, 3)
}
fun getPhoneNoWithoutCountryCode(phNo:String):String{
    return phNo.substring(3, phNo.length)
}
