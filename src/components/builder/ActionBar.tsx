'use client'

import { Save, RotateCcw, Eye, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface ActionBarProps {
  onSave: () => void
  onReset: () => void
  isSaving: boolean
  isLoading: boolean
}

const ActionBar = ({ onSave, onReset, isSaving, isLoading }: ActionBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.04)]"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white mb-1 font-serif">
            Design your link-in-bio page
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base font-sans">
            Make changes and see them instantly in the preview
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Preview Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-600 font-sans"
          >
            <Eye className="w-4 h-4" />
            Preview
          </motion.button>

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 disabled:opacity-50 border border-gray-200 dark:border-gray-600 font-sans"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSave}
            disabled={isSaving || isLoading}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg font-sans"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ActionBar
