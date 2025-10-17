#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <queue>
#include <stack>
#include <fstream>
#include "include/json.hpp"

// Algorithm headers
#include "algorithms/bubble_sort.hpp"
#include "algorithms/insertion_sort.hpp"
#include "algorithms/merge_sort.hpp"
#include "algorithms/quick_sort.hpp"
#include "algorithms/heap_sort.hpp"
#include "algorithms/bfs.hpp"
#include "algorithms/dfs.hpp"
#include "algorithms/dijkstra.hpp"
#include "algorithms/fibonacci_dp.hpp"

using namespace std;
using json = nlohmann::json;

int main() {
    ifstream fin("frontend/input.json");
    if (!fin) {
        cerr << "Input file error" << endl;
        return 1;
    }

    json input_json;
    fin >> input_json;
    fin.close();

    int choice = input_json["algorithm"];
    json output;
    json steps = json::array();

    if (choice == 1) {
        vector<int> arr = input_json["array"].get<vector<int>>();
        output["input"] = arr;
        bubble_sort(arr, steps);
        output["output"] = arr;
    } 
    else if (choice == 3) {
        vector<int> arr = input_json["array"].get<vector<int>>();
        output["input"] = arr;
        insertion_sort(arr, steps);
        output["output"] = arr;
    } 
    else if (choice == 4) {
        vector<int> arr = input_json["array"].get<vector<int>>();
        output["input"] = arr;
        merge_sort(arr, 0, (int)arr.size() - 1, steps);
        output["output"] = arr;
    } 
    else if (choice == 5) {
        vector<int> arr = input_json["array"].get<vector<int>>();
        output["input"] = arr;
        quick_sort(arr, 0, (int)arr.size() - 1, steps);
        output["output"] = arr;
    } 
    else if (choice == 8) { 
        vector<int> arr = input_json["array"].get<vector<int>>();
        output["input"] = arr;
        heap_sort(arr, steps);
        output["output"] = arr;
    } 
    else if (choice == 9) { 
        // Implement similar bfs/djikstra if required or integrate later
        output["input"] = input_json["array"];
        output["output"] = "Not implemented";
    }
    else if (choice == 10) { 
        output["input"] = input_json["array"];
        output["output"] = "Not implemented";
    }
    else if (choice == 11) { 
        int n = input_json["nodes"];
        vector<vector<int>> adj = input_json["adjacency_list"].get<vector<vector<int>>>();
        int start = input_json["start_node"];
        output["input"] = input_json;
        bfs(start, adj, steps);
        output["output"] = {{"steps_count", (int)steps.size()}};
    } 
    else if (choice == 12) { 
        int n = input_json["nodes"];
        vector<vector<int>> adj = input_json["adjacency_list"].get<vector<vector<int>>>();
        int start = input_json["start_node"];
        vector<bool> vis(n, false);
        output["input"] = input_json;
        dfs(start, adj, vis, steps);
        output["output"] = {{"steps_count", (int)steps.size()}};
    } 
    else if (choice == 13) { 
        int n = input_json["nodes"];
        vector<vector<pair<int,int>>> g(n);
        auto input_edges = input_json["edges"].get<vector<vector<int>>>();
        for(auto &e: input_edges){
            g[e[0]].push_back({e[1], e[2]});
        }
        int src = input_json["source_node"];
        output["input"] = input_json;
        vector<int> dist;
        dijkstra(src, g, dist, steps);
        output["output"] = {{"distances", dist}};
    } 
    else if (choice == 14) { 
        int n ; cin >>n;
        output["input"] = n;
        fibonacci_dp_steps(n, steps);
        output["output"] = steps.back()["val"];
    } 
    else {
        cerr << "Algorithm not implemented." << endl;
        return 1;
    }

    output["steps"] = steps;
    ofstream fout("/Users/shonalidixit/algorithm-visualizer/backend/frontend/output.json");
    fout << output.dump(4);
    fout.close();

    cout << "Output written successfully." << endl;
    return 0;
}
