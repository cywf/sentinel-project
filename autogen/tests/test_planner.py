import unittest
from planner import ask_planner

class TestPlanner(unittest.TestCase):

    def test_ask_planner(self):
        response = ask_planner("Sample question")
        self.assertIsNotNone(response)

if __name__ == '__main__':
    unittest.main()
