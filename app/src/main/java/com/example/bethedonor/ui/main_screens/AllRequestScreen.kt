package com.example.bethedonor.ui.main_screens

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.bethedonor.data.dataModels.RequestCardDetails
import com.example.bethedonor.ui.components.AllRequestCard
import com.example.bethedonor.ui.theme.bgDarkBlue

@Composable
fun AllRequestScreen(navController: NavController, innerPadding: PaddingValues, uId: String) {
    Surface(color = bgDarkBlue) {
        LazyColumn(modifier = Modifier.padding(8.dp)) {
            items(count = 5) { message ->
                AllRequestCard(
                    details = RequestCardDetails(
                        name = "Chayandev Bera",
                        emailId = "abcd@gmail.com",
                        phoneNo = "6549680439",
                        address = "West Bengal, Kolkata, Dhapa, 700105",
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
            // Adding spacer as a footer item
            item {
                Spacer(modifier = Modifier.height(innerPadding.calculateBottomPadding()))
            }
        }


    }
}

//@Preview
//@Composable
//fun AllRequestScreenPreview() {
//    AllRequestScreen(
//        navController = NavHostController(LocalContext.current),
//        innerPadding = PaddingValues(0.dp),
//        value = userId.value
//    )
//}