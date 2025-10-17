#include "merge_sort.hpp"

void merge(std::vector<int>& arr, int left, int mid, int right, nlohmann::json& steps) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    std::vector<int> L(n1), R(n2);
    for (int i=0; i<n1; i++) L[i] = arr[left + i];
    for (int j=0; j<n2; j++) R[j] = arr[mid + 1 + j];
    int i=0, j=0, k=left;
    while (i<n1 && j<n2) {
        steps.push_back({
            {"operation", "compare"},
            {"values", {L[i], R[j]}},
            {"array_state", arr}
        });
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        steps.push_back({
            {"operation", "insert"},
            {"index", k},
            {"value", arr[k]},
            {"array_state", arr}
        });
        k++;
    }
    while (i<n1) {
        arr[k] = L[i];
        steps.push_back({
            {"operation", "insert"},
            {"index", k},
            {"value", L[i]},
            {"array_state", arr}
        });
        i++; k++;
    }
    while (j<n2) {
        arr[k] = R[j];
        steps.push_back({
            {"operation", "insert"},
            {"index", k},
            {"value", R[j]},
            {"array_state", arr}
        });
        j++; k++;
    }
}

void merge_sort(std::vector<int>& arr, int left, int right, nlohmann::json& steps) {
    if (left < right) {
        int m = left + (right - left) / 2;
        merge_sort(arr, left, m, steps);
        merge_sort(arr, m+1, right, steps);
        merge(arr, left, m, right, steps);
    }
}
