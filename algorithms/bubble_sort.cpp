#include "bubble_sort.hpp"
#include <utility>

void bubble_sort(std::vector<int>& arr, nlohmann::json& steps) {
    int n = arr.size();
    for (int i=0; i<n-1; i++) {
        for (int j=0; j<n-1-i; j++) {
            steps.push_back({
                {"operation", "compare"},
                {"indices", {j, j+1}},
                {"array_state", arr}
            });
            if (arr[j] > arr[j+1]) {
                std::swap(arr[j], arr[j+1]);
                steps.push_back({
                    {"operation", "swap"},
                    {"indices", {j, j+1}},
                    {"array_state", arr}
                });
            }
        }
    }
}
