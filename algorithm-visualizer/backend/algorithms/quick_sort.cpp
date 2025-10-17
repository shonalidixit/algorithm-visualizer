#include "quick_sort.hpp"
#include <utility>

int partition(std::vector<int>& arr, int low, int high, nlohmann::json& steps) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j=low; j<high; j++) {
        steps.push_back({
            {"operation", "compare"},
            {"indices", {j, high}},
            {"array_state", arr}
        });
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
            steps.push_back({
                {"operation", "swap"},
                {"indices", {i, j}},
                {"array_state", arr}
            });
        }
    }
    std::swap(arr[i+1], arr[high]);
    steps.push_back({
        {"operation", "swap"},
        {"indices", {i+1, high}},
        {"array_state", arr}
    });
    return i+1;
}

void quick_sort(std::vector<int>& arr, int low, int high, nlohmann::json& steps) {
    if (low < high) {
        int pi = partition(arr, low, high, steps);
        quick_sort(arr, low, pi-1, steps);
        quick_sort(arr, pi+1, high, steps);
    }
}
