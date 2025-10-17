#include "bfs.hpp"
#include <queue>

void bfs(int start, const std::vector<std::vector<int>>& adj, nlohmann::json& steps) {
    int n = adj.size();
    std::vector<bool> visited(n, false);
    std::queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int node = q.front(); q.pop();

        // Copy queue to vector for JSON logging
        std::vector<int> q_vec;
        std::queue<int> temp_q = q;
        while (!temp_q.empty()) {
            q_vec.push_back(temp_q.front());
            temp_q.pop();
        }

        steps.push_back({
            {"operation", "visit"},
            {"node", node},
            {"queue", q_vec},
            {"visited", visited}
        });

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);

                // Copy queue again after enqueue
                q_vec.clear();
                temp_q = q;
                while (!temp_q.empty()) {
                    q_vec.push_back(temp_q.front());
                    temp_q.pop();
                }

                steps.push_back({
                    {"operation", "enqueue"},
                    {"neighbor", neighbor},
                    {"queue", q_vec}
                });
            }
        }
    }
}
