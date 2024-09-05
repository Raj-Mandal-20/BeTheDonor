package com.example.bethedonor.ui.utils.commons

import android.content.Context
import android.widget.Toast
import com.google.protobuf.Message


fun showToast(context: Context,message: String) {
    Toast.makeText(
        context,
        message,
        Toast.LENGTH_LONG
    ).show()
}