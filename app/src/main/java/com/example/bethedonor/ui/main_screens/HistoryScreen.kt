package com.example.bethedonor.ui.main_screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.bethedonor.ui.components.ProgressIndicatorComponent
import com.example.bethedonor.ui.components.RequestHistoryCard
import com.example.bethedonor.ui.components.Retry
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.theme.lightGray
import com.example.bethedonor.utils.isDeadlinePassed
import com.example.bethedonor.viewmodels.HistoryViewModel

data class TabItem(
    val title: String
)

@Composable
fun HistoryScreen(
    navController: NavHostController,
    token: String,
    historyViewModel: HistoryViewModel,
    innerPadding: PaddingValues,
) {
    val tabItem = listOf(
        TabItem("Requests"),
        TabItem("Donations")
    )
    val pagerState = rememberPagerState {
        tabItem.size
    }
    var selectedTabIndex by remember {
        mutableIntStateOf(0)
    }

    LaunchedEffect(selectedTabIndex) {
        pagerState.scrollToPage(selectedTabIndex)
    }

    LaunchedEffect(pagerState.currentPage) {
        selectedTabIndex = pagerState.currentPage
    }

    historyViewModel.updateRecomposeTime()
    Box(
        modifier = Modifier
            .fillMaxSize(), contentAlignment = Alignment.Center
    ) {
        Surface(
            modifier = Modifier.fillMaxSize(),
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(color = bgDarkBlue),
                contentAlignment = Alignment.Center
            ) {
                Column(modifier = Modifier.fillMaxWidth()) {
                    TabRow(
                        selectedTabIndex = selectedTabIndex,
                        containerColor = fadeBlue11,
                        indicator = { tabPositions ->
                            TabRowDefaults.PrimaryIndicator(
                                modifier = Modifier.tabIndicatorOffset(tabPositions[selectedTabIndex]),
                                width = LocalConfiguration.current.screenWidthDp.dp / 2,
                                height = 2.dp,
                                color = bloodRed2
                            )
                        },
                        divider = { HorizontalDivider(Modifier.height(1.dp), color = lightGray) }
                    ) {
                        tabItem.forEachIndexed { index, tab ->
                            Tab(
                                selected = index == selectedTabIndex,
                                onClick = { selectedTabIndex = index },
                                text = { Text(tab.title, color = Color.White) }
                            )
                        }
                    }

                    HorizontalPager(
                        state = pagerState,
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                    ) { page ->
                        when (page) {
                            0 -> RequestScreen(token = token, historyViewModel = historyViewModel,innerPadding)
                            //1 -> DonationScreen() // Create DonationScreen similar to RequestScreen
                        }
                    }
                }
            }
        }
    }
}

//@Composable
//fun DonationScreen() {
//    TODO("Not yet implemented")
//}

@Composable
fun RequestScreen(token: String, historyViewModel: HistoryViewModel, innerPadding: PaddingValues) {
    LaunchedEffect(Unit) {
        if (historyViewModel.shouldFetch())
            networkCall(token = token, historyViewModel = historyViewModel, id = 1)
    }

    val isLoading by historyViewModel.isRequestFetching.collectAsState()
    val requestHistoryResponseList by historyViewModel.requestHistoryResponseList.collectAsState(null)
    var retryFlag by remember { mutableStateOf(false) }

    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
        when {
            isLoading -> {
                ProgressIndicatorComponent()
                retryFlag = false
            }
            retryFlag -> {
                Retry(message = "Something Went Wrong") {
                    retryFlag = false
                    networkCall(token = token, historyViewModel = historyViewModel, id = 1)
                }
            }
            else -> requestHistoryResponseList?.let { result ->
                val requestHistory = if (result.isSuccess) {
                    result.getOrNull()
                } else {
                    retryFlag = true
                    listOf()
                }
                requestHistory?.let {
                    LazyColumn {
                        item {
                            Spacer(modifier = Modifier.height(innerPadding.calculateTopPadding()))
                        }
                        items(
                            items = requestHistory,
                            key = { it.bloodRequest.id }
                        ) { requestHistory ->
                            RequestHistoryCard(
                                donationCenter = requestHistory.bloodRequest.donationCenter,
                                state = requestHistory.bloodRequest.state,
                                district = requestHistory.bloodRequest.district,
                                pin = requestHistory.bloodRequest.pin,
                                count = requestHistory.bloodRequest.donors.size,
                                activeStatus = !isDeadlinePassed(requestHistory.bloodRequest.deadline)
                            )
                        }
                        item {
                            Spacer(modifier = Modifier.height(innerPadding.calculateBottomPadding()+16.dp))
                        }
                    }
                }
            }
        }
    }
}


fun networkCall(token: String, historyViewModel: HistoryViewModel, id: Int) {
    when (id) {
        1 -> {
            historyViewModel.fetchRequestHistory(token)
        }

        2 -> {

        }
    }
}
