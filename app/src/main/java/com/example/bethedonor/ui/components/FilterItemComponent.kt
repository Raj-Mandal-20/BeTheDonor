package com.example.bethedonor.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.ArrowDropUp
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.theme.bloodRed
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.theme.fadeBlue2

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FilterItemComponent(
    label: String,
    options: List<String>,
    selectedValue: String,
    onSelection: (String) -> Unit,
    onResetClick: () -> Unit = {}
) {
    var expanded by remember { mutableStateOf(false) }

    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = Modifier
            .background(color = fadeBlue1, shape = RoundedCornerShape(8.dp))
            .border(
                if (selectedValue.isEmpty()) 1.dp else 2.dp,
                if (selectedValue.isEmpty()) Color.Gray else bloodRed2,
                RoundedCornerShape(8.dp)
            )
            .padding(8.dp)
    ) {
        Box(
            modifier = Modifier
                .background(color = fadeBlue1)
                .padding(horizontal = 8.dp)
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .menuAnchor() // Make sure the entire row is clickable
            ) {
                Text(
                    text = selectedValue.ifEmpty { label },
                    color = if (selectedValue.isEmpty()) Color.LightGray else Color.White,
                    fontSize = 14.sp
                )
                Icon(
                    imageVector = if (expanded) Icons.Filled.ArrowDropUp else Icons.Filled.ArrowDropDown,
                    contentDescription = null,
                    tint = if (expanded) bloodRed2 else Color.White,
                )
            }
        }
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            modifier = Modifier
                .background(fadeBlue2)
                .fillMaxWidth()
        ) {
            Column {
                options.forEach { option: String ->
                    DropdownMenuItem(
                        text = { Text(text = option, color = Color.White) },
                        onClick = {
                            expanded = false
                            onSelection(option)
                        }
                    )
                }
                // Adding the Reset text at the bottom
                if(options.isNotEmpty())
                DropdownMenuItem(
                    text = {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(top = 8.dp, end = 8.dp),
                            contentAlignment = Alignment.BottomEnd
                        ) {
                            Text(
                                text = "Reset",
                                color = bloodRed2,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.clickable {
                                    onResetClick()
                                    expanded = false
                                }
                            )
                        }
                    },
                    onClick = { /* No action needed as it's handled by the clickable modifier */ }
                )
            }
        }
    }
}

@Preview
@Composable
fun FilterItemComponentPreview() {
    FilterItemComponent(
        label = "City",
        options = listOf("New York", "Los Angeles", "Chicago"),
        selectedValue = "",
        onSelection = {},
        onResetClick = { /* Reset action */ }
    )
}
