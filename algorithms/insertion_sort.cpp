#include "insertion_sort.hpp"

void insertion_sort(std::vector<int>& arr, nlohmann::json& steps) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        steps.push_back({
            {"operation", "select"},
            {"index", i},
            {"array_state", arr}
        });
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            steps.push_back({
                {"operation", "shift"},
                {"from", j},
                {"to", j + 1},
                {"array_state", arr}
            });
            j--;
        }
        arr[j + 1] = key;
        steps.push_back({
            {"operation", "insert"},
            {"index", j + 1},
            {"value", key},
            {"array_state", arr}
        });
    }
}
