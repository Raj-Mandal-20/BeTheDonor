package com.example.bethedonor.ui.components

import android.widget.Space
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.runtime.traceEventEnd
import androidx.compose.ui.AbsoluteAlignment
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.bethedonor.ui.theme.Gray2
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.teal

@Composable
fun AvailabilityCheckerField(value:Boolean,onCheckerChange: (Boolean) -> Unit) {
    var checkedState by remember { mutableStateOf(value) }
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 16.dp),
        horizontalAlignment = AbsoluteAlignment.Left
    ) {
        Row(
            horizontalArrangement = Arrangement.Start,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = checkedState,
                modifier = Modifier.width(20.dp),
                onCheckedChange = {
                    checkedState = it
                    onCheckerChange(checkedState)
                },
                enabled = true,
                colors = CheckboxDefaults.colors(
                    checkedColor = teal,
                    checkmarkColor = bgDarkBlue
                )
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Available to Donate ?",
                style = TextStyle(color = Color.White, fontWeight = FontWeight.SemiBold)
            )
        }
        Text(
            text = "This will allow others to see your contact information.",
            style = TextStyle(color = Gray2, fontWeight = FontWeight.Normal)
        )
    }

}