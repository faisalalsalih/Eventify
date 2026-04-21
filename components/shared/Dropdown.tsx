"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/mongodb/database/models/category.model"
import { startTransition, useEffect, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Input } from "../ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"

type DropdownProps = {
  value?: string
  onChangeHandler?: (value: string) => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState('');
  const [open, setOpen] = useState(false);

  const handleAddCategory = () => {
    if(!newCategory.trim()) return;

    createCategory({ categoryName: newCategory.trim() })
      .then((category) => {
        setCategories((prevState) => [...prevState, category])
        setNewCategory('')
        setOpen(false) 
        
        // CRITICAL: Update the form value to the new category ID
        // This resets the Select so "unassigned" is no longer the active value
        onChangeHandler?.(category._id)
      })
  }

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories();
  }, [])

  return (
    <>
      <Select 
        onValueChange={(val) => {
          if (val === 'unassigned') {
            setOpen(true)
          } else {
            onChangeHandler?.(val)
          }
        }} 
        // Use value instead of defaultValue to make it controlled
        value={value}
      >
        <SelectTrigger className="select-field w-full">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>

          {categories.length > 0 && categories.map((category) => (
            <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
              {category.name}
            </SelectItem>
          ))}

          <SelectItem value="unassigned" className="cursor-pointer p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </SelectItem>

        </SelectContent>
      </Select>

      <AlertDialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen)
          // If the user closes the modal without adding, reset the form value 
          // so they can click "Add new" again.
          if(!isOpen && value === "unassigned") {
            onChangeHandler?.("")
          }
        }}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>New Category</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="mt-3">
                <Input 
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  value={newCategory}
                  autoFocus
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Dropdown