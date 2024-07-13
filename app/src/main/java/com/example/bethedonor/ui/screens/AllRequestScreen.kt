package com.example.bethedonor.ui.screens

import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import com.example.bethedonor.model.RequestCardDetails
import com.example.bethedonor.ui.components.AllRequestCard
import com.example.bethedonor.ui.theme.bgDarkBlue

@Composable
fun AllRequestScreen(navController: NavController) {
    Surface(color = bgDarkBlue) {
        LazyColumn(modifier = Modifier.padding(12.dp)) {
            items(count = 5) { message ->
                AllRequestCard(
                    details = RequestCardDetails(
                        name = "Chayandev Bera",
                        emailId = "abcd@gmail.com",
                        phoneNo = "6549680439",
                        address = "West Bengal,Kolkata,Dhapa,700105",
                        exactPlace = "NRS",
                        bloodUnit = 10,
                        bloodGroup = "B+",
                        noOfAcceptors = 20,
                        dueDate = "Sun July 2024",
                        postDate = "Fri July 2024",
                        isOpen = true,
                    )
                )
            }
        }
    }
}

@Preview
@Composable
fun AllRequestScreenPreview() {
    AllRequestScreen(navController = NavHostController(LocalContext.current))
}