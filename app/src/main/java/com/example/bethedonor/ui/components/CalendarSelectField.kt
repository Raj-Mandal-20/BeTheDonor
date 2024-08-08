package com.example.bethedonor.ui.components

import android.app.DatePickerDialog
import android.widget.DatePicker
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.ui.theme.ErrorColor
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.teal
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

@Composable
fun CalendarSelectField(
    onFieldValueChanged: (value: String) -> ValidationResult,
    recheckField: Boolean = false,
    value: String = "",
    modifier: Modifier,
    label: String = "DOB"
) {
    val context = LocalContext.current
    var expanded by remember { mutableStateOf(false) }
    val selectedDate = remember { mutableStateOf(value) }
    val calendar = Calendar.getInstance()
    val dateFormat = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())
    var isErrorState by rememberSaveable { mutableStateOf(false) }
    var supportingTextState by rememberSaveable { mutableStateOf("") }

    val datePickerDialog = DatePickerDialog(
        context,
        { _: DatePicker, year: Int, month: Int, dayOfMonth: Int ->
            calendar.set(year, month, dayOfMonth)
            selectedDate.value = dateFormat.format(calendar.time)
            val result = onFieldValueChanged(selectedDate.value)
            supportingTextState = result.errorComment
            isErrorState = !result.status
        },
        calendar.get(Calendar.YEAR),
        calendar.get(Calendar.MONTH),
        calendar.get(Calendar.DAY_OF_MONTH)
    )

    OutlinedTextField(
        readOnly = true,
        value = selectedDate.value,
        onValueChange = {},
        modifier = modifier
            .clip(shape = RoundedCornerShape(8.dp))
            .clickable { datePickerDialog.show() },
        label = { Text(text = label, fontSize = 14.sp) },
        trailingIcon = {
            IconButton(onClick = {
                if (label != "DOB") {
                    val today = Calendar.getInstance()
                    datePickerDialog.datePicker.minDate = today.timeInMillis
                }
                datePickerDialog.show()

            }) {
                Icon(
                    imageVector = Icons.Default.DateRange,
                    contentDescription = "Select Date",
                    tint = Gray1
                )
            }
        },
        colors = OutlinedTextFieldDefaults.colors(
            focusedLabelColor = teal,
            focusedBorderColor = teal,
            unfocusedBorderColor = Gray1,
            unfocusedLabelColor = Color.Gray,
            cursorColor = teal,
            focusedLeadingIconColor = Color.White,
            unfocusedLeadingIconColor = Color.Gray,
            focusedTrailingIconColor = Color.White,
            errorLabelColor = ErrorColor,
            errorBorderColor = ErrorColor,
            errorLeadingIconColor = ErrorColor,
            errorCursorColor = ErrorColor
        ),
        textStyle = TextStyle(color = Color.White),
        shape = RoundedCornerShape(16.dp),
        singleLine = true,
        maxLines = 1,
        isError = if (recheckField) {
            val result = onFieldValueChanged(selectedDate.value)
            supportingTextState = result.errorComment
            isErrorState = !result.status
            isErrorState
        } else isErrorState,
        supportingText = {
            if (isErrorState) {
                Text(
                    text = supportingTextState,
                    modifier = Modifier.fillMaxWidth(),
                    color = ErrorColor
                )
            }
        }
    )
}
