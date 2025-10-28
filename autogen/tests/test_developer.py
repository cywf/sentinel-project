import unittest
from developer import dev


class TestDeveloper(unittest.TestCase):

    def test_dev_ask(self):
        response = dev.ask("Sample question")
        self.assertIsNotNone(response)


if __name__ == "__main__":
    unittest.main()
